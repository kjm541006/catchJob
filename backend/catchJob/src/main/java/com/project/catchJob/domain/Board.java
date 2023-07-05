package com.project.catchJob.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = {"member","boardCommentsList", "boardLikeList", "boardTagList"})
@Entity
public class Board {
	
	@Id @GeneratedValue @Column(name = "board_id")
	private Long boardId;
	
	private String bTitle;
	
	@Lob
	private String bContents; // editor���(��뷮)
	
	@Column(insertable = false, updatable = false, columnDefinition = "bigint default 0")
	private int bCnt; // ��ȸ��
	
	@Column(insertable = false, updatable = false, columnDefinition = "bigint default 0")
	private int bLike; // ���ƿ䰹��
	
	private String bFileName; // ���ϸ� 
	
	@Transient
	private MultipartFile bUploadFile; // �������?(�Ƹ���)
	
	private String bCoverFileName; // Ŀ��(�����) ���ϸ�
	
	@Transient
	private MultipartFile bCoverUploadFile; // Ŀ�� �������(�Ƹ���)
	
	@ManyToOne
	@JoinColumn(name = "member_id", nullable = false, updatable = false)
	private Member member;
	
	public void setMember(Member member) {
		this.member = member;
		member.getBoardList().add(this);
	}
	
	@OneToMany(mappedBy = "board")
	private List<B_comments> boardCommentsList = new ArrayList<>();
	
	@OneToMany(mappedBy = "board")
	private List<B_like> boardLikeList = new ArrayList<>();
	
	@OneToMany(mappedBy = "board")
	private List<B_tag> boardTagList = new ArrayList<>();

}
