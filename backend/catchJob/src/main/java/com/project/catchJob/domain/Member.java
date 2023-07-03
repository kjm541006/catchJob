package com.project.catchJob.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString(exclude = {"communityList","c_CommentsList"})
@Entity
public class Member {

	@Id
	@GeneratedValue
	@Column(name = "member_id")
	private Long memberId; // email �� �� �ĺ��Ϸ��� ���� ���̵�
	
	private String name;
	
	private String email;
	
	private String pwd;
	
	private String job; // ����
	
	private boolean hasCareer; // ��¿���(f=����/t=���)

	@OneToMany(mappedBy = "member", cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
	private List<Community> communityList = new ArrayList<>();
	
	@OneToMany(mappedBy = "member", cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
	private List<C_comments> c_CommentsList = new ArrayList<>();
	
	

}
