package com.project.catchJob.domain.project;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.project.catchJob.domain.Member;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = {"member", "project"})
@Entity
public class P_comments {

	@Id @GeneratedValue
	private Long pComId; // ������Ʈ��� ���̵�
	
	private String pComContent; // ��� ����
	
	@Column(insertable = false, updatable = false, columnDefinition = "date default now()")
	private Date pComDate; // ��� �ۼ���¥
	
	@ManyToOne
	@JoinColumn(name = "member_id", nullable = false, updatable = false)
	private Member member;
	
	public void setMember(Member member) {
		this.member = member;
		member.getP_CommentsList().add(this);
	}
	
	@ManyToOne
	@JoinColumn(name = "project_id", nullable = false, updatable = false)
	private Project project;
	
	public void setProject(Project project) {
		this.project = project;
		project.getProjectCommentsList().add(this);
	}	
}